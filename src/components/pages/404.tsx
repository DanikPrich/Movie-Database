import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const PageNotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 500px
  }
`;

const Page404 = () => {
  return (
    <PageNotFoundWrapper>
      <Helmet>
          <meta
              name="description"
              content={`page not found`}
          />
          <title>Page not found</title>
      </Helmet>
      <img 
        src="https://static.vecteezy.com/system/resources/previews/008/255/804/original/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-graffiti-sprayed-page-not-found-error-404-isolated-on-white-background-vector.jpg" 
        alt="Page not found" 
      />
    </PageNotFoundWrapper>
  )
}

export default Page404