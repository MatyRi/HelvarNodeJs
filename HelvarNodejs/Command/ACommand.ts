export abstract class ACommand {
    abstract toCommandTextString(): string;

    public toCommandString(): string {
        return `>${this.toCommandTextString()}#`;
    }
}