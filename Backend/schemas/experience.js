export default {
  name: 'experienceByYear',
  title: 'Experience By Year',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year',
      type: 'string', // For example: "2018 - 2019"
    },
    {
      name: 'skills',
      title: 'Skills',
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
  ],
};
