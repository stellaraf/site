import { Card, CardBody, TrialForm } from '~/components';
import { submitTrialForm } from '~/util';

import type { TContentForm } from './types';

export const Form: React.FC<TContentForm> = (props: TContentForm) => {
  const { name, ...rest } = props.form;
  return (
    <Card minHeight="lg" height="min-content" w={{ base: '20rem', md: '80%' }}>
      <CardBody>
        <TrialForm name={name} fields={rest} onSubmit={submitTrialForm} />
      </CardBody>
    </Card>
  );
};
