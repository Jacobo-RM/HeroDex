using System.Text.Json;
using System.Text.Json.Serialization;
using HeroDex.Models;

namespace HeroDex.Services;

public class CharacterService
{
    public string GetJson()
    {
        var json = File.ReadAllText("json\\hero.json");
        return json;
    }

    public async Task<List<Character>> getCharacters()
    {
        var json = GetJson();
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        options.Converters.Add(new JsonStringEnumConverter());
        var characters = JsonSerializer.Deserialize<List<Character>>(json, options);
        return characters ?? [];
    }

    public async Task<Character> getCharacterById(int characterId)
    {
        var characters = await getCharacters();
        return characters.FirstOrDefault(a => a.Id == characterId);
    }
    public async Task<Character> getCharacterByName(string characterName)
    {
        var characters = await getCharacters();
        return characters.FirstOrDefault(a => a.Name.Equals(characterName, StringComparison.OrdinalIgnoreCase));
    }

    public async Task<List<Character>> getCharacterByUniverse(UniverseType universe)
    {
        var characters = await getCharacters();
        return characters.Where(a => a.Universe == universe).ToList();
    }

    public async Task<List<Character>> getCharactersByType(CharacterType type)
    {
        var characters = await getCharacters();
        return characters.Where(a => a.CharacterType == type).ToList();
    }

    public async Task<List<TeamDetail>> GetTeams()
    {
        var characters = await getCharacters();
        var teams = characters
                    .SelectMany(c => c.Teams)
                    .GroupBy(t => t.Name)
                    .Select(teamGroup => new TeamDetail
                    {
                        Name = teamGroup.Key,
                        Description = teamGroup.First().Description,
                        Logo = teamGroup.First().Logo,

                        Members = characters
                            .Where(character =>
                                character.Teams.Any(t => t.Name == teamGroup.Key))
                            .ToList()
                    })
                    .ToList();
        return teams;
    }

 public async Task<Character> GetTargetCharacterOfTheDay()
    {
        var characters = await getCharacters();
        if (characters.Count == 0)
        {
            throw new Exception("No hay personajes cargados en el archivo JSON.");
        }

        // Usamos los días transcurridos desde una fecha base para calcular el índice
        var baseDate = new DateTime(2024, 1, 1);
        var totalDays = (DateTime.UtcNow.Date - baseDate).Days;
        
        int index = totalDays % characters.Count;
        return characters[index];
    }

    public CharacterCompareResult Compare(Character guessed, Character target)
    {
        return new CharacterCompareResult
        {
            Id = guessed.Id,
            Name = guessed.Name,
            Image = guessed.Image,
            UniverseStatus = guessed.Universe == target.Universe ? "Correct" : "Incorrect",
            UniverseValue = guessed.Universe.ToString(),
            CharacterTypeStatus = guessed.CharacterType == target.CharacterType ? "Correct" : "Incorrect",
            CharacterTypeValue = guessed.CharacterType.ToString(),
            PublisherStatus = guessed.Publisher == target.Publisher ? "Correct" : "Incorrect",
            PublisherValue = guessed.Publisher,
            IsAliveStatus = guessed.IsAlive == target.IsAlive ? "Correct" : "Incorrect",
            IsAliveValue = guessed.IsAlive ? "Vivo" : "Muerto",
            PowersStatus = EvaluateListMatch(
                guessed.Powers.Select(p => p.Name).ToList(), 
                target.Powers.Select(p => p.Name).ToList()
            ),
            PowersValue = string.Join(", ", guessed.Powers.Select(p => p.Name)),
            TeamsStatus = EvaluateListMatch(
                guessed.Teams.Select(t => t.Name).ToList(), 
                target.Teams.Select(t => t.Name).ToList()
            ),
            TeamsValue = string.Join(", ", guessed.Teams.Select(t => t.Name))
        };
    }

    private string EvaluateListMatch(List<string> guessedList, List<string> targetList)
    {
        if (guessedList.Count == 0 && targetList.Count == 0) return "Correct";
        var matchingCount = guessedList.Intersect(targetList).Count();

        if (matchingCount == 0) 
            return "Incorrect"; 
            
        if (matchingCount == targetList.Count && guessedList.Count == targetList.Count) 
            return "Correct";

        return "Partial"; 
    }
}