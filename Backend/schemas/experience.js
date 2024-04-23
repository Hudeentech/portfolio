export default {
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields:[
        {
          name: 'summary',
          title: 'Breif summary',
          type: 'string',
        },
        {
          name: 'years',
          title: 'Years of experience',
          type: 'string',
        },
        {
        name:'images',
        type: 'object',
        fields:[
            {
              name: 'expIcons',
              title: 'Enter experience icon e.g React',
              type: 'array',      
                of: [{ type: 'image' }]
            },
        ]
      },
    ]
  }
  