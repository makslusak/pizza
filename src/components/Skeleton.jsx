import React from 'react';
import ContentLoader from 'react-content-loader';

function Skeleton() {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="331" rx="5" ry="5" width="291" height="88" />
      <circle cx="140" cy="140" r="140" />
      <rect x="0" y="288" rx="5" ry="5" width="280" height="27" />
      <rect x="146" y="429" rx="20" ry="20" width="130" height="36" />
      <rect x="0" y="437" rx="5" ry="5" width="87" height="23" />
    </ContentLoader>
  );
}

export default Skeleton;
