import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import PostsList from 'components/PostsList'
import ArchiveHeader from 'components/ArchiveHeader'
import Cover from 'components/Cover'

class TagArchive extends React.Component {
  render() {
    const { title, post } = this.props.data.contentfulTag
    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <Cover bgImage="/assets/header-bg.jpg">
          <ArchiveHeader title={title} />
        </Cover>
        <PostsList
          posts={post}
          params={{}}
          tags={[{ title: 'Tag 1', slug: 'tag-1' }]}
        />
      </div>
    )
  }
}

TagArchive.propTypes = {
  data: PropTypes.object,
}

export default TagArchive

export const TagArchiveQuery = graphql`
  query TagArchiveQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulTag(id: { eq: $id }) {
      title
      slug
      post {
        title {
          title
          id
        }
        slug
        childContentfulPostBodyTextNode {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
  }
`
