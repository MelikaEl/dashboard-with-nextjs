import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/*
The Breadcrumbs function is a React component that renders a navigation breadcrumb. Let's break down its functionality:
1. It takes a single prop called breadcrumbs, which is an array of Breadcrumb objects.
2. Each Breadcrumb object in the array has the following structure:
  interface Breadcrumb {
     label: string;  // The text to display for this breadcrumb
     href: string;   // The URL this breadcrumb links to
     active?: boolean; // Optional flag to indicate if this is the current page
   }
The function renders a navigation element with an ordered list (<ol>) containing the breadcrumbs.
It maps over the breadcrumbs array, creating a list item (<li>) for each breadcrumb.
Each breadcrumb is rendered as a link (<Link>) with the appropriate text and URL.
6. The component applies different styling based on whether a breadcrumb is active (current page) or not.
It adds a separator ("/") between breadcrumbs, except for the last one.
The component uses the clsx utility for conditional class name construction and applies some Tailwind CSS classes for styling.
9. It also uses a custom font (lusitana) for the text.
This component is typically used to show the user's current location within a website's hierarchy, allowing for easy navigation back to parent pages. For example, it might render something like:
Home / Invoices / Current Invoice
Each part of this path would be clickable (except possibly the current page), allowing users to navigate back up the hierarchy.
*/
