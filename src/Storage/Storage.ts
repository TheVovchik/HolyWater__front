import { APIStorage } from './APIStorage';
import { DataStorage } from './DataStorage';
import { LSStorage } from './LSStorage';

enum StorageType {
  localStorage = 'LS',
  RESTApi = 'api',
}

const Storages: Record<StorageType, DataStorage> = {
  [StorageType.localStorage]: new LSStorage(),
  [StorageType.RESTApi]: new APIStorage(),
};

export const dataStorage = Storages[StorageType.RESTApi];
