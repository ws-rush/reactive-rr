import { attributes, ReactComponent } from '@/content/about.md'
import CarbonDicomOverlay from '~icons/carbon/dicom-overlay'
import { TheFooter } from '@/components/TheFooter'

export default function About() {
  return (
    <main className="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <div className="prose dark:prose-invert max-w-none m-auto text-base">
        <div className="text-center">
          <CarbonDicomOverlay className="text-4xl mb-6 m-auto text-teal-600" />
          <h2>{attributes.title}</h2>
        </div>
        <ReactComponent />
      </div>

      <TheFooter />
    </main>
  )
}
