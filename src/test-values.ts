import { Parameters } from './any';

/**
 * Test values
 */
export class TestingValues {
  // descriptions
  public AWSError = 'AWS Error';
  public InvalidTest = 'returns error from AWS';
  public MustSupply = 'Must supply';
  public ThrowsOnEmpty = 'throws on empty';
  public ValidTest = 'returns valid response from AWS';

  // empty values
  public EmptyArray = [];
  public EmptyObject = {};
  public EmptyString = '';

  // strings
  public Description = 'description';
  public Name = 'name';
  public Id = 'id';
  public Path = 'path';
  public Type = 'type';
  public StringValue = 'value';

  // objects
  // eslint-disable-next-line no-invalid-this
  public Parameters: Parameters = { Parameter: [this.StringValue] };
}
