/** Assigns defined values of properties in `sourceObject` to properties with matching names in `targetObject` */

export const populate = <Target = Record<string, any>>(targetObject: Target, sourceObject: Partial<Target>): void => {
	if (Object.prototype.toString.call(targetObject) === '[object Object]' &&
		Object.prototype.toString.call(sourceObject) === '[object Object]') {
		// eslint-disable-next-line no-restricted-syntax
		for (const propertyKey in targetObject) {
			if (sourceObject[propertyKey] !== undefined) {
				targetObject[propertyKey] = sourceObject[propertyKey];
			}
		}
	}
};
