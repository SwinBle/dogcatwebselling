import dynamic from 'next/dynamic'

const PawsomePetsEnhanced = dynamic(() => import('@/components/pawsome-pets-enhanced'), { ssr: false })

export default function Home() {
  return (
    <main>
      <PawsomePetsEnhanced />
    </main>
  )
}
