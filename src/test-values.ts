import { Parameters } from './any';

/**
 * Test values
 */
export class TestingValues {
    // descriptions
    public AWSError: string = 'AWS Error';
    public InvalidTest: string = 'returns error from AWS';
    public MustSupply: string = 'Must supply';
    public ThrowsOnEmpty: string = 'throws on empty';
    public ValidTest: string = 'returns valid response from AWS';

    // empty values
    public EmptyArray = [];
    public EmptyObject = {};
    public EmptyString: string = '';

    // strings
    public Description: string = 'description';
    public Name: string = 'name';
    public Id: string = 'id';
    public Path: string = 'path';
    public Type: string = 'type';
    public StringValue: string = 'value';

    // objects
    public Parameters: Parameters = { Parameter: [this.StringValue] };
}
