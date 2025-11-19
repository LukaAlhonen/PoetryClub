import styled from "@emotion/styled";
import type React from "react";
import { useEffect, useRef } from "react";

interface ScrollContainerProps {
  onIntersect: () => void;
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const ScrollContainer = ({onIntersect, children, threshold = 0.1, rootMargin = "0% 0% 20%"}: ScrollContainerProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        root: scrollRef.current,
        threshold,
        rootMargin
      }
    )
    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }

    return () => observer.disconnect();
  },[onIntersect, threshold, rootMargin])

  return (
    <Container ref={scrollRef} data-scroll-container>
      {children}
      <div ref={bottomRef} style={{ height: "1px" }} />
    </Container>

  )
}

export default ScrollContainer;

const Container = styled.div({
  flexGrow: 1,
  overflowY: "auto",
  minHeight: 0,
  paddingRight: "1rem",
})
