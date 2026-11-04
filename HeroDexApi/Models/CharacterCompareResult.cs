namespace HeroDex.Models;
public class CharacterCompareResult
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;

    public string UniverseStatus { get; set; } = string.Empty; // Correct, Incorrect
    public string UniverseValue { get; set; } = string.Empty;

    public string CharacterTypeStatus { get; set; } = string.Empty; // Correct, Incorrect
    public string CharacterTypeValue { get; set; } = string.Empty;

    public string PublisherStatus { get; set; } = string.Empty; // Correct, Incorrect
    public string PublisherValue { get; set; } = string.Empty;

    public string IsAliveStatus { get; set; } = string.Empty; // Correct, Incorrect
    public string IsAliveValue { get; set; } = string.Empty;

    public string PowersStatus { get; set; } = string.Empty; // Correct, Partial, Incorrect
    public string PowersValue { get; set; } = string.Empty;

    public string TeamsStatus { get; set; } = string.Empty; // Correct, Partial, Incorrect
    public string TeamsValue { get; set; } = string.Empty;
}