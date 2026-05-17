export default function GlowText({ children, className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`glow-text ${className}`}>
      {children}
    </Tag>
  )
}