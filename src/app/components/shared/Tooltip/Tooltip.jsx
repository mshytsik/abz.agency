import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import useOnResize from '../../../hooks/useOnResize';

import './Tooltip.scss';

const TOOLTIP_OFFSET = { x: -12, y: 29 };

const Tooltip = ({ value, children }) => {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [showValue, setShowValue] = useState(false);

  const tooltipRef = useRef();
  const contentRef = useRef();
  const valueRef = useRef();

  useOnResize(() => {
    const contentChild = contentRef.current.firstElementChild;
    setHasOverflow(contentChild.scrollWidth > contentChild.offsetWidth);
  });

  const handleMove = (e) => {
    if (hasOverflow && showValue) {
      valueRef.current.style.left = `calc(${e.clientX - tooltipRef.current.getBoundingClientRect().left + TOOLTIP_OFFSET.x}px`;
      valueRef.current.style.top = `calc(${e.clientY - tooltipRef.current.getBoundingClientRect().top + TOOLTIP_OFFSET.y}px)`;
    }
  };

  return (
    <div className="tooltip" ref={tooltipRef}>
      <div
        className="tooltip__content"
        ref={contentRef}
        onMouseMove={handleMove}
        onMouseEnter={() => hasOverflow && setShowValue(true)}
        onMouseLeave={() => hasOverflow && setShowValue(false)}
      >
        {children}
      </div>

      {hasOverflow && (
        <CSSTransition
          nodeRef={valueRef}
          in={showValue}
          timeout={0}
          classNames="tip"
        >
          <span className="tooltip__value" ref={valueRef}>
            {value}
          </span>
        </CSSTransition>
      )}
    </div>
  );
};

export default Tooltip;
