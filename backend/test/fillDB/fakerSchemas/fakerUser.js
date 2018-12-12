module.exports = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      faker: 'internet.email'
    },
    password: {
      type: 'string',
      faker: 'internet.password'
    },
    name: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          faker: 'name.firstName'
        },
        last: {
          type: 'string',
          faker: 'name.lastName'
        }
      },
      required: ['first', 'last']
    },
    course: {
      type: 'integer',
      minimum: 1,
      maximum: 8
    },
    photo: {
      type: 'string',
      faker: 'image.avatar'
    },
    vk: {
      type: 'string',
      faker: 'internet.url'
    },
    photoState: {
      type: 'integer',
      minimum: 0,
      maximum: 3
    },
    modMessage: {
      type: 'string'
    },
    deathCode: {
      type: 'string',
      pattern: '^[0-9]{4}$'
    },
    admin: {
      type: 'boolean'
    }
  },
  required: [
    'email',
    'password',
    'name',
    'course',
    'photo',
    'vk',
    'photoState',
    'deathCode',
    'admin'
  ]
}
