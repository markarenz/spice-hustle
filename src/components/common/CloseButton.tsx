import IconClose from 'components/icons/IconClose';

type Props = {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
};
const CloseButton: React.FC<Props> = ({ handleClose }) => {
  return (
    <button
      onClick={handleClose}
      className="block w-8 h-8 rounded-full bg-orange-900 ring-0 ring-gray-200 hover:ring-2 transition-all duration-300 group"
      data-testid="btn-close"
      title="Close"
    >
      <div className="group-hover:rotate-90 transition-transform duration-500 p-2">
        <IconClose />
      </div>
    </button>
  );
};

export default CloseButton;
