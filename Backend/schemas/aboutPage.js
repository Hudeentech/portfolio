export default {
    name: 'aboutInfo',
    title: 'About page info',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'bio',
        title: 'Biography',
        type: 'array',
        of: [{type: 'block'}],
      },
      {
        name: 'imageUrl',
        title: 'Image URL',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
      },
      {
        name: 'otherInfo',
        title: 'Other Information',
        type: 'object',
        fields: [
          {
            name: 'age',
            title: 'Age',
            type: 'number',
          },
          {
            name: 'location',
            title: 'Location',
            type: 'string',
          },
          {
            name: 'phoneNumber',
            title: 'phone number',
            type: 'string',
          },
          {
            name: 'email',
            title: 'email',
            type: 'string',
          },
          {
            name: 'whatsapp',
            title: 'watsapp',
            type: 'string',
          },
          {
            name: 'occupation',
            title: 'Occupation',
            type: 'string',
          },
          {
            name: 'language',
            title: 'Language',
            type: 'string',
          },
          {
            name: 'hobbies',
            title: 'Hobbies',
            type: 'array',
            of: [{ type: 'string' }],
          },
          {
            name: 'skills',
            title: 'Skills',
            type: 'array',
            of: [{ type: 'string' }],
          },
          {
            name: 'experience',
            title: 'Experience',
            type: 'array',
            of: [{type: 'block'}],
          },
        ],
      },
    ],
  };
  