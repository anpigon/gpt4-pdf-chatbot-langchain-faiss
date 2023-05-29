import { FaissStore } from 'langchain/vectorstores/faiss';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { CustomPDFLoader } from '@/utils/customPDFLoader';

/* Name of directory to retrieve your files from */
const filePath = 'docs';

// Save the vector store to a directory
const indexFilePath = 'faiss-store';

export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new CustomPDFLoader(path),
      '.txt': (path) => new TextLoader(path),
      '.csv': (path) => new CSVLoader(path),
    });

    const rawDocs = await directoryLoader.load();

    const vectorStore = await FaissStore.fromDocuments(
      rawDocs,
      new OpenAIEmbeddings(),
    );

    await vectorStore.save(indexFilePath);
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
