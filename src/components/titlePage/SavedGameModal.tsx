import { useState, useEffect } from 'react';
import { getLocalSavesList, deleteSaveItem } from 'utils/saveLoadUtils';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/common/Modal';
import Table from 'components/common/Table';
import Button from 'components/common/Button';
import { GameSaveListItemDisplay, TableFieldLabel } from 'types';

type Props = {
  handleToggleModal: Function;
};
const SavedGameModal: React.FC<Props> = ({ handleToggleModal }) => {
  const [savesList, setSavesList] = useState<GameSaveListItemDisplay[]>([]);
  const initLocalSaves = async () => {
    const newSavesList = await getLocalSavesList();
    setSavesList(newSavesList);
  };
  useEffect(() => {
    initLocalSaves();
  }, []);
  const handleDeleteSaveItem = (id: string) => {
    setSavesList(savesList.filter((save) => save.id !== id));
    deleteSaveItem(id);
  };
  const saveListTableActions = (id: string) => (
    <div>
      <span className="mr-4 mb-2 block lg:inline w-full lg:w-auto">
        <Button
          onClick={() => {}}
          labelKey="title_page__saved_game_modal__btn_load"
          variant="secondary"
          testId={`btn-load-${id}`}
        />
      </span>
      <Button
        onClick={() => handleDeleteSaveItem(id)}
        labelKey="title_page__saved_game_modal__btn_delete"
        variant="secondary"
        testId={`btn-delete-${id}`}
      />
    </div>
  );
  const savedGameFieldLabels: TableFieldLabel[] = [
    { slug: 'modifiedAt', titleKey: 'title_page__saved_game_modal__table_field__dateModified' },
    { slug: 'location', titleKey: 'title_page__saved_game_modal__table_field__location' },
    { slug: 'netWealth', titleKey: 'title_page__saved_game_modal__table_field__netWealth' },
  ];
  return (
    <Modal handleClose={handleToggleModal} titleKey="title_page__saved_game_modal__title">
      <div data-testid="saved-game-modal">
        {savesList.length > 0 ? (
          <Table
            data={savesList}
            fieldLabels={savedGameFieldLabels}
            // sortKey="modifiedAt"
            actions={saveListTableActions}
          />
        ) : (
          <h2 className="text-lg italic bold py-6">
            <FormattedMessage id="title_page__saved_game_modal__no_results" />
          </h2>
        )}
      </div>
    </Modal>
  );
};

export default SavedGameModal;
