import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DndContainer from './dndContainer';

export default function AllSpots(props) {
  const {groupId, day} = props;

  return (
    <div className="bg-neutral-200 w-full">
      <DndProvider backend={HTML5Backend}>
        <DndContainer groupId={groupId} day={day} />
      </DndProvider>
    </div>
  );
}