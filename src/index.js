import { application } from 'express';

application.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));