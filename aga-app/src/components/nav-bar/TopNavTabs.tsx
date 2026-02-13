interface TopNavTabsProps {
  href: string;
  label: string;
}

export default function TopNavTabs(props: TopNavTabsProps) {
  return (
    <>
      <li className="text-center md:flex gap-8 lg:gap-10">
        <a href={props.href} className="text-[15px] font-medium tracking-wide">
          {props.label}
        </a>
      </li>
    </>
  );
}
