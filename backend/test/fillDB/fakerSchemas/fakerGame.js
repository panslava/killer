module.exports = {
  type: 'object',
  properties: {
    settings: {
      title: 'settings',
      type: 'object',
      properties: {
        gameState: {
          type: 'string',
          enum: ['Registration', 'Game', 'End']
        },
        timeForKill: {
          type: 'integer',
          minimum: 1
        },
        startTime: {
          type: 'string',
          format: 'date-time'
        }
      },
      required: ['gameState', 'timeForKill', 'startTime']
    }
  },
  required: ['settings']
}
