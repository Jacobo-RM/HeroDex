using HeroDex.Models;
using HeroDex.Services;
using Microsoft.AspNetCore.Mvc;

namespace HeroDex.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CharacterController : ControllerBase
{
    private readonly CharacterService _characterService;

    public CharacterController(CharacterService characterService)
    {
        _characterService = characterService;
    }

    // GET api/character
    [HttpGet]
    public async Task<IActionResult> GetCharacters()
    {
        var characters = await _characterService.getCharacters();
        return Ok(characters);
    }

    // GET api/character/1
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCharacterById(int id)
    {
        var characters = await _characterService.getCharacterById(id);
        return Ok(characters);
    }

    // GET api/character/Spiderman
    [HttpGet("name/{name}")]
    public async Task<IActionResult> GetCharacterByName(string name)
    {
        var character = await _characterService.getCharacterByName(name);

        if (character is null)
            return NotFound($"No existe el personaje '{name}'");

        return Ok(character);
    }

    // GET api/character/universe/Marvel
    [HttpGet("universe/{universe}")]
    public async Task<IActionResult> GetCharactersByUniverse(UniverseType universe)
    {
        var characters = await _characterService.getCharacterByUniverse(universe);
        return Ok(characters);
    }

    // GET api/character/type/Villain
    [HttpGet("type/{type}")]
    public async Task<IActionResult> GetCharactersByType(CharacterType type)
    {
        var characters = await _characterService.getCharactersByType(type);
        return Ok(characters);
    }

    // GET api/character/teams
    [HttpGet("teams")]
    public async Task<IActionResult> GetTeams()
    {
        var teams = await _characterService.GetTeams();
        return Ok(teams);
    }

    [HttpPost("guess")]
    public async Task<IActionResult> MakeGuess([FromBody] GuessRequest request)
    {
        var guessedCharacter = await _characterService.getCharacterById(request.CharacterId);
        if (guessedCharacter == null)
        {
            return NotFound(new { message = "El personaje seleccionado no existe." });
        }
        var targetCharacter = await _characterService.GetTargetCharacterOfTheDay();
        var comparisonResult = _characterService.Compare(guessedCharacter, targetCharacter);
        bool hasWon = guessedCharacter.Id == targetCharacter.Id;
        return Ok(new
        {
            hasWon = hasWon,
            results = comparisonResult
        });
    }


    [HttpGet("search-list")]
    public async Task<IActionResult> GetSearchList()
    {
        var allCharacters = await _characterService.getCharacters();
        
        var searchList = allCharacters.Select(c => new
        {
            c.Id,
            c.Name,
            c.Image
        }).ToList();

        return Ok(searchList);
    }
}


public class GuessRequest
{
    public int CharacterId { get; set; }
}