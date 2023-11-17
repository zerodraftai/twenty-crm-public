import { ObjectMetadataItem } from '../types/ObjectMetadataItem';
import { formatObjectMetadataItemInput } from '../utils/formatObjectMetadataItemInput';
import { getObjectSlug } from '../utils/getObjectSlug';

import { useCreateOneObjectRecordMetadataItem } from './useCreateOneObjectMetadataItem';
import { useDeleteOneObjectMetadataItem } from './useDeleteOneObjectMetadataItem';
import { useFindManyObjectMetadataItems } from './useFindManyObjectMetadataItems';
import { useUpdateOneObjectMetadataItem } from './useUpdateOneObjectMetadataItem';

export const useObjectMetadataItemForSettings = () => {
  const { objectMetadataItems, loading } = useFindManyObjectMetadataItems({
    objectFilter: {
      isSystem: { is: false },
    },
    fieldFilter: {
      isSystem: { is: false },
    },
  });

  const activeObjectMetadataItems = objectMetadataItems.filter(
    ({ isActive }) => isActive,
  );
  const disabledObjectMetadataItems = objectMetadataItems.filter(
    ({ isActive }) => !isActive,
  );

  const findActiveObjectMetadataItemBySlug = (slug: string) =>
    activeObjectMetadataItems.find(
      (activeObjectMetadataItem) =>
        getObjectSlug(activeObjectMetadataItem) === slug,
    );

  const findObjectMetadataItemById = (id: string) =>
    objectMetadataItems.find(
      (objectMetadataItem) => objectMetadataItem.id === id,
    );

  const findObjectMetadataItemByNamePlural = (namePlural: string) =>
    objectMetadataItems.find(
      (objectMetadataItem) => objectMetadataItem.namePlural === namePlural,
    );

  const { createOneObjectMetadataItem } =
    useCreateOneObjectRecordMetadataItem();
  const { updateOneObjectMetadataItem } = useUpdateOneObjectMetadataItem();
  const { deleteOneObjectMetadataItem } = useDeleteOneObjectMetadataItem();

  const createObjectMetadataItem = (
    input: Pick<
      ObjectMetadataItem,
      'labelPlural' | 'labelSingular' | 'icon' | 'description'
    >,
  ) => createOneObjectMetadataItem(formatObjectMetadataItemInput(input));

  const editObjectMetadataItem = (
    input: Pick<
      ObjectMetadataItem,
      'id' | 'labelPlural' | 'labelSingular' | 'icon' | 'description'
    >,
  ) =>
    updateOneObjectMetadataItem({
      idToUpdate: input.id,
      updatePayload: formatObjectMetadataItemInput(input),
    });

  const activateObjectMetadataItem = (
    objectMetadataItem: Pick<ObjectMetadataItem, 'id'>,
  ) =>
    updateOneObjectMetadataItem({
      idToUpdate: objectMetadataItem.id,
      updatePayload: { isActive: true },
    });

  const disableObjectMetadataItem = (
    objectMetadataItem: Pick<ObjectMetadataItem, 'id'>,
  ) =>
    updateOneObjectMetadataItem({
      idToUpdate: objectMetadataItem.id,
      updatePayload: { isActive: false },
    });

  const eraseObjectMetadataItem = (
    objectMetadataItem: Pick<ObjectMetadataItem, 'id'>,
  ) => deleteOneObjectMetadataItem(objectMetadataItem.id);

  return {
    activateObjectMetadataItem,
    activeObjectMetadataItems,
    createObjectMetadataItem,
    disabledObjectMetadataItems,
    disableObjectMetadataItem,
    editObjectMetadataItem,
    eraseObjectMetadataItem,
    findActiveObjectMetadataItemBySlug,
    findObjectMetadataItemById,
    findObjectMetadataItemByNamePlural,
    loading,
    objectMetadataItems,
  };
};
