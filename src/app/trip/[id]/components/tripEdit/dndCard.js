'use client';

import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';

const ItemTypes = {CARD: 'card',}

export const DndCard = ({ id, text, index, address, moveCard }) => {

  // Drag and Drop
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div ref={ref} data-handler-id={handlerId} className='shadow bg-white p-3 rounded-md'>
      <div className='flex justify-between'>
        <Typography variant='inherit'>{text}</Typography>
        <div className='flex gap-2'>
          <CommentIcon />
          <ThumbUpOffAltIcon />
        </div>
      </div>
      <Typography variant='caption'>{address}</Typography>
    </div>
  )
}
