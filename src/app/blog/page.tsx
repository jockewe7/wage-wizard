import { getAllPosts } from '@/lib/content'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { sv } from 'date-fns/locale'

export const metadata = {
  title: 'Blog - Frilansguider och skatteregler',
  description: 'Läs våra guider om svenska skatteregler, 3:12-regler, optimal lön och utdelning för frilansare och egenföretagare.',
  keywords: 'frilans blog, svenska skatteregler, 3:12 regler, utdelning guide, egenföretagare tips',
}

export default function BlogPage() {
  const posts = getAllPosts('blog')

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frilansguider & Skatteregler
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Djupdyka i svenska skatteregler, 3:12-regler och optimera din ekonomi som frilansare.
          </p>
        </div>

        {posts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              Inga artiklar publicerade än. Kom tillbaka snart!
            </p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {post.frontmatter.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(post.frontmatter.publishedAt), { 
                        addSuffix: true, 
                        locale: sv 
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">
                    {post.frontmatter.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {post.frontmatter.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {post.readingTime.text}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}