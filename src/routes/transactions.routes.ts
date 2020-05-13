import { Router } from 'express';
import multer from 'multer';

import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionService from '../services/ListTransactionService';
import uploadConfig from '../configs/upload';
// import TransactionsBalance from '../models/TransactionsBalance';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const listTransaction = new ListTransactionService();

  const transactions = await listTransaction.execute();

  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute(id);

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactions = new ImportTransactionsService();

    await importTransactions
      .execute(request.file.filename)
      .then(transactions => response.json(transactions));
  },
);

export default transactionsRouter;
