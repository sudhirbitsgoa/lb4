import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Logs} from '../models';
import {LogsRepository} from '../repositories';

export class LogsController {
	constructor(
		@repository(LogsRepository)
		public logsRepository: LogsRepository,
	) {}

	@post('/logs', {
		responses: {
			'200': {
				description: 'Logs model instance',
				content: {'application/json': {schema: getModelSchemaRef(Logs)}},
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Logs, {
						title: 'NewLog',
						exclude: ['name'],
					}),
				},
			},
		})
		log: Omit<Logs, 'name'>,
	): Promise<Logs> {
		return this.logsRepository.create(log);
	}

	@get('/logs/count', {
		responses: {
			'200': {
				description: 'Logs model count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async count(
		@param.where(Logs) where?: Where<Logs>,
	): Promise<Count> {
		return this.logsRepository.count(where);
	}

	@get('/logs', {
		responses: {
			'200': {
				description: 'Array of Logs model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(Logs, {includeRelations: true}),
						},
					},
				},
			},
		},
	})
	async find(
		@param.filter(Logs) filter?: Filter<Logs>,
	): Promise<Logs[]> {
		return this.logsRepository.find(filter);
	}

	@patch('/logs', {
		responses: {
			'200': {
				description: 'Logs PATCH success count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Logs, {partial: true}),
				},
			},
		})
		log: Logs,
		@param.where(Logs) where?: Where<Logs>,
	): Promise<Count> {
		return this.logsRepository.updateAll(log, where);
	}

	@get('/logs/{id}', {
		responses: {
			'200': {
				description: 'Logs model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(Logs, {includeRelations: true}),
					},
				},
			},
		},
	})
	async findById(
		@param.path.string('id') id: string,
		@param.filter(Logs, {exclude: 'where'}) filter?: FilterExcludingWhere<Logs>
	): Promise<Logs> {
		return this.logsRepository.findById(id, filter);
	}

	@patch('/logs/{id}', {
		responses: {
			'204': {
				description: 'Logs PATCH success',
			},
		},
	})
	async updateById(
		@param.path.string('id') id: string,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Logs, {partial: true}),
				},
			},
		})
		log: Logs,
	): Promise<void> {
		await this.logsRepository.updateById(id, log);
	}

	@put('/logs/{id}', {
		responses: {
			'204': {
				description: 'Logs PUT success',
			},
		},
	})
	async replaceById(
		@param.path.string('id') id: string,
		@requestBody() log: Logs,
	): Promise<void> {
		await this.logsRepository.replaceById(id, log);
	}

	@del('/logs/{id}', {
		responses: {
			'204': {
				description: 'Logs DELETE success',
			},
		},
	})
	async deleteById(@param.path.string('id') id: string): Promise<void> {
		await this.logsRepository.deleteById(id);
	}
}
