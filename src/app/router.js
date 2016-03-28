import { Router } from 'express';

const router =  new Router();

router.get('/ui/*', (req, res) => {
  res.sendFile('/dist/public/index.html', {root: '.'});
});

export default router;
