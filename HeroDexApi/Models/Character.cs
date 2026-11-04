namespace HeroDex.Models;

public class Character
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string RealName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public UniverseType Universe { get; set; }
    public CharacterType CharacterType { get; set; }
    public string Image { get; set; } = string.Empty;
    public string  Video {get; set;} = string.Empty;
    public string Logo { get; set; } = string.Empty;
    public string FirstAppearance { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public List<Team> Teams { get; set; } = [];
    public List<Power> Powers { get; set; } = [];
    public string Banner { get; set; } = string.Empty;
    public bool IsAlive { get; set; }
    public string Occupation { get; set; } = string.Empty;
    public string BaseOfOperations { get; set; } = string.Empty;
    public List<string> Aliases { get; set; } = [];



}




