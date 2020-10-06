import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Logs extends Entity {
	@property({
		type: 'string',
		required: true,
		id: true
	})
	name: string;

	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<Logs>) {
		super(data);
	}
}

export interface LogsRelations {
	// describe navigational properties here
}

export type LogWithRelations = Logs & LogsRelations;
