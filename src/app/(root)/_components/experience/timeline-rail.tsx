import { experiences } from "./data";
import TimelineNode from "./timeline-node";

type Props = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

/** Full-width horizontal rail — desktop only. */
const TimelineRail = ({ activeIndex, onSelect }: Props) => (
  <ol
    className="hidden lg:grid w-full"
    style={{
      gridTemplateColumns: `repeat(${experiences.length}, minmax(0, 1fr))`,
    }}
  >
    {experiences.map((experience, index) => (
      <li key={experience.id} className="min-w-0">
        <TimelineNode
          experience={experience}
          isActive={index === activeIndex}
          isDone={index < activeIndex}
          isFirst={index === 0}
          isLast={index === experiences.length - 1}
          onSelect={() => onSelect(index)}
        />
      </li>
    ))}
  </ol>
);

export default TimelineRail;
