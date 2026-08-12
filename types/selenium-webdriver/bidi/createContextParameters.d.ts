export class CreateContextParameters {
    private map: Map<string, string | boolean>;

    referenceContext(id: string): this;

    background(background: boolean): this;

    userContext(userContext: string): this;

    asMap(): Map<string, string | boolean>;
}
