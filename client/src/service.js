// const API_URL = 'http://localhost:3030';
//I want to move fetch requests here

//mockup data
export const generateMockData = () => {
  return [
    {
      title: "Melissa's first street crossing",
      media: "../client/public/image.png",
      description: "Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look.",
      child: 'Melissa',
      location: 'Berlin',
      date: '2024-06-01',
      category: 'Travel'
    },
    {
      title: "Melissa's day at the park",
      media: "../client/public/park.png",
      description: "A wonderful day at the park with lots of fun activities.",
      child: 'Melissa',
      location: 'Berlin',
      date: '2024-06-02',
      category: 'Leisure'
    },
    {
      title: "Melissa's school event",
      media: "../client/public/school.png",
      description: "Melissa participated in a school event and won a prize!",
      child: 'Melissa',
      location: 'Berlin',
      date: '2024-06-03',
      category: 'Education'
    }
  ];
};
