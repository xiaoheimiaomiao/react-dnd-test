import React, { useCallback, useEffect, useRef, useState } from "react";
import "../css/App2.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type CardItem = {
  id: number;
  content: string;
};

type CardProps = {
  data: CardItem;
  index: number;
  swapIndex: Function;
};

type DragData = {
  id: number;
  index: number;
};

const Card = (props: CardProps) => {
  const { data, swapIndex, index } = props;

  const ref = useRef(null);

  const [{ dragging }, drag] = useDrag({
    type: "card",
    item: {
      id: data.id,
      index: index,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  //   s
  const [, drop] = useDrop({
    accept: "card",
    hover(item: DragData, monitor) {
      //   console.log("item: ", item);
      swapIndex(index, item.index);
      item.index = index;
    },
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);
  return (
    <div className={dragging ? "card dragging" : "card"} ref={ref}>
      {data.content}
    </div>
  );
};

export default function App2() {
  const [cardList, setCardList] = useState<CardItem[]>([
    {
      id: 0,
      content: "000",
    },
    {
      id: 1,
      content: "111",
    },
    {
      id: 2,
      content: "222",
    },
    {
      id: 3,
      content: "333",
    },
    {
      id: 4,
      content: "444",
    },
  ]);

  const swapIndex = useCallback((index1: number, index2: number) => {
    const tmp = cardList[index1];
    cardList[index1] = cardList[index2];
    cardList[index2] = tmp;

    setCardList([...cardList]);
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="card-list">
        {cardList.map((item: CardItem, index) => {
          return (
            <Card
              data={item}
              key={"card_" + item.id}
              index={index}
              swapIndex={swapIndex}
            ></Card>
          );
        })}
      </div>
    </DndProvider>
  );
}
