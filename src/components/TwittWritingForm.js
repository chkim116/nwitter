import React from "react";
import { Button } from "style/button";
import { Input } from "style/input";

export const TwittWritingForm = () => {
  return (
    <div>
      <div>
        <form>
          <Input type='text' placeholder='트윗 입력' />
          <Button type='submit'>등록</Button>
        </form>
      </div>
    </div>
  );
};
