import { getAllPosts } from '@/lib/content'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { sv } from 'date-fns/locale'
import { BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Guider - Praktiska tips för svenska frilansare',
  description: 'Praktiska guider för svenska frilansare. Lär dig optimera din ekonomi, förstå skatteregler och maximera din lönsamhet.',
  keywords: 'frilans guider, ekonomiska tips, lönsamhet, företagande, självständig',
}

export default function GuidesPage() {
  const guides = getAllPosts('guides')

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Praktiska Guider för Frilansare
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Steg-för-steg guider som hjälper dig optimera din ekonomi och förstå 
            reglerna för svenskt frilansande.
          </p>
        </div>

        {guides.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              Inga guider publicerade än. Kom tillbaka snart!
            </p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent-foreground rounded-full">
                      {guide.frontmatter.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(guide.frontmatter.publishedAt), { 
                        addSuffix: true, 
                        locale: sv 
                      })}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-accent-foreground transition-colors">
                    {guide.frontmatter.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">
                    {guide.frontmatter.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {guide.frontmatter.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {guide.readingTime.text}
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