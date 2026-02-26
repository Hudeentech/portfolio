export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Client Title / Role',
      type: 'string',
      description: 'e.g. "Director of Design · ACE"',
    },
    {
      name: 'feedback',
      title: 'Feedback',
      type: 'text',
      rows: 4,
    },
    {
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'rating',
      title: 'Star Rating (1–5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5).integer(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
};
