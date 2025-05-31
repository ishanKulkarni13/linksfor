// app/tree/[username]/page.tsx

import { backgroundRegistry } from '@/theme/registry/backgrounds';
import { buttonRegistry } from '@/theme/registry/buttons';
import { profileRegistry } from '@/theme/registry/profiles';

export default async function TreePage({ tree }) {

  const theme = tree.theme;

  const Background = await backgroundRegistry[theme.config.background.type].load();
  const Profile = await profileRegistry[theme.config.profile.type].load();
  const Button = await buttonRegistry[theme.config.buttons.type].load();

  return (
    <>
      <Background {...theme.config.background.props} />
      <div className="relative z-10 flex flex-col items-center">
        <Profile {...theme.config.profile.props} />

        <div className="mt-6 space-y-4 w-full px-4">
          {tree.treeContent.links.map(link => (
            <Button key={link.url} href={link.url} {...theme.buttons.props}>
              {link.title}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
