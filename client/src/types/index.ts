export type SectionProps = {
    children: React.ReactNode,
    title: string,
    id?: NavItemType["name"],
}

export type HeadingProps = {
    title: string,
}

export type NavItemType = {
    url: string | null,
    name: string,
}