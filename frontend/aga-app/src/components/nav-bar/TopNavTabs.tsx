interface TopNavTabsProps {
  href: string;
  label: string;
}

export default function TopNavTabs(props: TopNavTabsProps) {
  return (
    <>
      <li className="text-center md:flex gap-8 lg:gap-10 flex text-[var(--text-color-light-mode)] active:brightness-90 hover:brightness-110 hover:saturate-125 transition-all duration-150">
        <a href={props.href} className="text-[15px] font-medium tracking-wide">
          {props.label}
        </a>
      </li>
    </>
  );
}
