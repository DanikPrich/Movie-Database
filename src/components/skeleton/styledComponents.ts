import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

export const SkeletonMovie = styled.li`
  position: relative;
  width: 200px;
  height: 318px;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .25);
  padding: 15px;
  border-radius: 8px;
  overflow: hidden;
`;

export const SkeletonMovieHeader = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  object-fit: cover;
  transform: translate(-15px, -15px);
  background-color: #C4C4C4;
  animation: ${pulse} 2s infinite;
`;

export const SkeletonMovieMini = styled.div`
  margin-bottom: 15px;
  height: 16px;
  background-color: #C4C4C4;
  animation: ${pulse} 2s infinite;
`;

export const SkeletonInfoHeader = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  column-gap: 10px;
  align-items: center;
`;

export const SkeletonInfoCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #C4C4C4;
  border-radius: 100%;
  animation: ${pulse} 2s infinite;
`;

export const SkeletonInfoMini = styled.div`
  width: 100%;
  height: 16px;
  background-color: #C4C4C4;
  animation: ${pulse} 2s infinite;
`;

export const SkeletonInfoBlock = styled.div`
  height: 35px;
  width: 100%;
  background-color: #C4C4C4;
  margin-top: 15px;
  animation: ${pulse} 2s infinite;
`;

export const SkeletonInfoTitle = styled.p`
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
`