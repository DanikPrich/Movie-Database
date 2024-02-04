import React from 'react';
import { SkeletonMovie, SkeletonMovieHeader, SkeletonMovieMini } from './styledComponents.ts';

const MovieSkeleton = () => {
    return (
        <SkeletonMovie>
            <SkeletonMovieHeader />
            <SkeletonMovieMini />
            <SkeletonMovieMini />
            <SkeletonMovieMini />
        </SkeletonMovie>
    )
}

export default MovieSkeleton;
