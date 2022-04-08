import {
  EntityDataModuleConfig,
  EntityMetadataMap,
} from '@ngrx/data';
import { ICategory } from '@projects/interface';

const entityMetadata: EntityMetadataMap = {
  Category: {
    filterFn: (
      categorys: ICategory[],
      fnFunction: (e: ICategory) => boolean
    ) => {
      if (fnFunction) {
        return categorys?.filter(fnFunction);
      } else {
        return categorys;
      }
    },
  },
};

const pluralNames = {
  Category: 'Categories',
};

export const categoryEntityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
