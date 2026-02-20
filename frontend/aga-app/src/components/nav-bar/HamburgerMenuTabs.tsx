interface HamburgerMenuTabsProps {
  href: string;
  label: string;
}

export default function HamburgerMenuTabs(props: HamburgerMenuTabsProps) {
  return (
    <>
      <li className="text-4xl text-center py-10 text-[var(--color-primary-light-mode)] active:brightness-90 hover:brightness-110 hover:saturate-125 transition-all duration-150">
        <a href={props.href} className="font-medium tracking-wide">
          {props.label}
        </a>
      </li>
    </>
  );
}
