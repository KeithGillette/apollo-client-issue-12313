import ObjectID from 'bson-objectid';


/** Creates consistent globally unique identifiers overriding database generated identifiers for entities needing them prior to database insertion
 */
export const newEntityId = (): string => {
	return new ObjectID().toHexString();
};
