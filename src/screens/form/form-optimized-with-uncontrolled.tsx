import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Layout, LayoutMain, LayoutSidebar } from '@/components/core/layout';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { getFruitEmoji } from './utils';

export function FormOptimizedWithUncontrolled() {
  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [validating, setValidating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // We're no longer controlling the form fields, however we still listen to
  // changes so we can validate the field after each keystroke and update the
  // errors if needed. We don't set a new errors object every time we validate,
  // only when the error message actually changes.
  function handleFieldChange<
    E extends
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | string
  >(event: E) {
    if (!validating) return;
    if (typeof event === 'string') {
      validate();
    } else {
      const fieldName = event.target.id;
      const currError = errors[fieldName];
      const newError = event.target.validationMessage;
      // only set a new error object if the message has changed, otherwise we
      // would be re-rendering the entire form on every keystroke
      if (currError !== newError) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [fieldName]: newError,
        }));
      }
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setValidating(true);
      validate();
      return;
    }

    // We're no longer controlling the form fields, so there are no reactive
    // values of form state in scope anymore. Therefore we need to get the
    // values from the form element directly.
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const favoriteFruit = form.favoriteFruit.value;

    toast({
      description: `Thank you ${firstName} ${lastName}! ${getFruitEmoji(
        favoriteFruit
      )}`,
    });
  }

  function validate() {
    const form = formRef.current!;
    setErrors({
      firstName: form.firstName.validationMessage,
      lastName: form.lastName.validationMessage,
      favoriteFruit: form.favoriteFruit.validationMessage,
    });
  }

  return (
    <Layout>
      <LayoutSidebar>
        <div className="p-6">
          <Typography variant="h4" component="h1">
            Form (Optimized by making it Uncontrolled)
          </Typography>
          <Typography variant="p">
            This form is optimized by making the fields uncontrolled. Typing or
            modifying any of the form fields will not cause any re-renders.
          </Typography>
          <Typography variant="p">
            Any data entered into the fields is now stored in the DOM, not in
            React state. Since they're no longer reactive state values, no
            re-renders are triggered.
          </Typography>
        </div>
      </LayoutSidebar>
      <LayoutMain>
        <form ref={formRef} noValidate onSubmit={handleSubmit}>
          <div className="max-w-sm mx-auto p-6 space-y-6">
            <Typography variant="h4" component="h2">
              My Profile
            </Typography>
            {/*
              Removing the `value` prop from the inputs means we're no longer
              controlling the form fields. Any data entered into the fields is
              now stored in the DOM, not in React state. Since they're no longer
              reactive state values, no re-renders are triggered.
             */}
            <div className="grid items-center gap-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                className={cn(
                  validating && errors['firstName'] && 'border-red-500'
                )}
                type="text"
                id="firstName"
                placeholder="First Name"
                required
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(e)
                }
              />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                className={cn(
                  validating && errors['lastName'] && 'border-red-500'
                )}
                type="text"
                id="lastName"
                placeholder="Last Name"
                required
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(e)
                }
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="aboutMe">About Me</Label>
              <Textarea
                placeholder="Something about yourself."
                id="aboutMe"
                onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleFieldChange(e)
                }
              />
            </div>
            <div className="grid items-center gap-1.5">
              <Label htmlFor="favoriteFruitTrigger">Favorite Fruit</Label>
              <Select
                name="favoriteFruit"
                required
                onValueChange={handleFieldChange}
              >
                <SelectTrigger
                  id="favoriteFruitTrigger"
                  className={cn(
                    validating && errors['favoriteFruit'] && 'border-red-500'
                  )}
                >
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="strawberry">Strawberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Save</Button>
          </div>
        </form>
      </LayoutMain>
    </Layout>
  );
}
