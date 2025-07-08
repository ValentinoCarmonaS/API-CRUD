const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API CRUD',
			version: '1.0.0',
			description:
				'API REST para gestión de usuarios con autenticación JWT',
			contact: {
				name: 'Valentino Carmona',
				url: 'https://github.com/ValentinoCarmonaS/API-CRUD'
			},
			license: {
				name: 'ISC',
				url: 'https://opensource.org/licenses/ISC'
			}
		},
		servers: [
			{
				url: process.env.DEPLOYMENT_URL,
				description: 'Servidor de producción'
			}
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT'
				}
			},
			schemas: {
				User: {
					type: 'object',
					properties: {
						_id: {
							type: 'string',
							description:
								'ID único del usuario'
						},
						name: {
							type: 'string',
							description:
								'Nombre del usuario',
							minLength: 2,
							maxLength: 50
						},
						email: {
							type: 'string',
							format: 'email',
							description:
								'Email del usuario'
						},
						password: {
							type: 'string',
							description:
								'Contraseña del usuario',
							minLength: 6
						},
						role: {
							type: 'string',
							enum: ['user', 'admin'],
							description:
								'Rol del usuario'
						}
					}
				},
				UserResponse: {
					type: 'object',
					properties: {
						_id: {
							type: 'string',
							description:
								'ID único del usuario'
						},
						name: {
							type: 'string',
							description:
								'Nombre del usuario'
						},
						email: {
							type: 'string',
							format: 'email',
							description:
								'Email del usuario'
						},
						role: {
							type: 'string',
							enum: ['user', 'admin'],
							description:
								'Rol del usuario'
						}
					}
				},
				LoginRequest: {
					type: 'object',
					required: ['email', 'password'],
					properties: {
						email: {
							type: 'string',
							format: 'email',
							description:
								'Email del usuario'
						},
						password: {
							type: 'string',
							description:
								'Contraseña del usuario'
						}
					}
				},
				RegisterRequest: {
					type: 'object',
					required: ['name', 'email', 'password'],
					properties: {
						name: {
							type: 'string',
							description:
								'Nombre del usuario',
							minLength: 2,
							maxLength: 50
						},
						email: {
							type: 'string',
							format: 'email',
							description:
								'Email del usuario'
						},
						password: {
							type: 'string',
							description:
								'Contraseña del usuario',
							minLength: 6
						}
					}
				},
				AuthResponse: {
					type: 'object',
					properties: {
						success: {
							type: 'boolean',
							description:
								'Estado de la operación'
						},
						message: {
							type: 'string',
							description:
								'Mensaje de respuesta'
						},
						data: {
							type: 'object',
							properties: {
								token: {
									type: 'string',
									description:
										'Token JWT'
								},
								user: {
									$ref: '#/components/schemas/UserResponse'
								}
							}
						}
					}
				},
				SuccessResponse: {
					type: 'object',
					properties: {
						success: {
							type: 'boolean',
							description:
								'Estado de la operación'
						},
						message: {
							type: 'string',
							description:
								'Mensaje de respuesta'
						},
						data: {
							$ref: '#/components/schemas/UserResponse'
						}
					}
				},
				UsersListResponse: {
					type: 'object',
					properties: {
						success: {
							type: 'boolean',
							description:
								'Estado de la operación'
						},
						message: {
							type: 'string',
							description:
								'Mensaje de respuesta'
						},
						users: {
							type: 'array',
							items: {
								$ref: '#/components/schemas/UserResponse'
							}
						}
					}
				},
				UserDetailResponse: {
					type: 'object',
					properties: {
						success: {
							type: 'boolean',
							description:
								'Estado de la operación'
						},
						message: {
							type: 'string',
							description:
								'Mensaje de respuesta'
						},
						user: {
							$ref: '#/components/schemas/UserResponse'
						}
					}
				},
				ErrorResponse: {
					type: 'object',
					properties: {
						success: {
							type: 'boolean',
							description:
								'Estado de la operación'
						},
						message: {
							type: 'string',
							description:
								'Mensaje de error'
						},
						error: {
							type: 'string',
							description:
								'Descripción del error'
						}
					}
				},
				ValidationErrorResponse: {
					type: 'object',
					properties: {
						success: {
							type: 'boolean',
							description:
								'Estado de la operación'
						},
						message: {
							type: 'string',
							description:
								'Mensaje de error'
						},
						errors: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									msg: {
										type: 'string',
										description:
											'Mensaje de error'
									},
									param: {
										type: 'string',
										description:
											'Parámetro que causó el error'
									},
									location: {
										type: 'string',
										description:
											'Ubicación del error'
									}
								}
							}
						}
					}
				}
			}
		},
		security: []
	},
	apis: ['./src/controllers/*.js', './src/routes/*.js']
};

const specs = swaggerJSDoc(options);

module.exports = {
	swaggerUi,
	specs
};
